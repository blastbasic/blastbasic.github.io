; Dictionary is made up of unordered key-value pair list

d = dict(3,"Three",2,"Two") ; create with Keys 2 and 3

d(1)="One"	; add new key 1 with value "One"

Print "Count: ", len(d) ; length is now 3

Print "Sorting..."
; sorted print using keys as index 
For i = 1 to len(d) ; 1 to 3
	Print "Key ", i, " = ", Get(d,i)
Next
