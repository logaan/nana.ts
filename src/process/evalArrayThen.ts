import { Value, Environment } from "../data/types";
import { EvalExpression } from "./evalExpression";
import { Complete, isComplete, Process, Running } from "./types";

class EvalArrayThen implements Running {
    todo: Array<Value>;
    done: Array<Value>;
    doing: Process;
    env: Environment;
    then: (done: Array<Value>) => Process;

    constructor(todo: Array<Value>, done: Array<Value>, doing: Process,
        env: Environment, then: (done: Array<Value>) => Process) {
        this.todo = todo;
        this.done = done;
        this.doing = doing;
        this.env = env;
        this.then = then;
    }

    step(): Process {
        if (isComplete(this.doing)) {
            const newDone = this.done.concat(this.doing.result);

            if (this.todo.length == 0) {
                return this.then(newDone);
            } else {
                const newDoing = new EvalExpression(this.todo[0], this.env);
                const newTodo = this.todo.slice(1);
                return new EvalArrayThen(newTodo, newDone, newDoing, this.env, this.then);
            }
        } else {
            const newDoing = this.doing.step();
            return new EvalArrayThen(this.todo, this.done, newDoing, this.env, this.then);
        }
    }

}

export function startEvaluatingList(todo: Array<Value>, env: Environment, then: (done: Array<Value>) => Process) {
    if (todo.length == 0) {
        return then([]);
    } else {
        const doing = new EvalExpression(todo[0], env);
        const newTodo = todo.slice(1);
        return new EvalArrayThen(newTodo, [], doing, env, then);
    }
}

export function tcoEvaluateList(todo: Array<Value>, env: Environment) {
    if (todo.length == 0) {
        // TODO: There's probably a better place to assert this
        throw "Functions must contain at least one body expression"
    } else if (todo.length == 1) {
        return new EvalExpression(todo[0], env);
    } else {
        const first = todo[0];
        const last = todo.slice(-1)[0];

        const middle = todo.slice(1, -1);
        const doing = new EvalExpression(first, env);
        const then = (_: Value[]) => new EvalExpression(last, env)

        return new EvalArrayThen(middle, [], doing, env, then);
    }
}

export function completeWithLast(done: Value[]): Process {
    return new Complete(done[done.length - 1]);
}
