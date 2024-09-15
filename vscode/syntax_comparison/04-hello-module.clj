(ns hello-world)

(def greeting
  "Hello")

(defn greet [name]
  (println greeting name))

(def fn-test
  (greet "Logan"))

(defmacro ignore [expression]
  (print "Printing what I want instead"))

(def macro-test
  (ignore (print "This text won't be printed")))

(if foo
  (println "Bar")
  (+ this that))
