statement 
    -> var_assign

var_assign
    -> %identifier _ "=" _ expr

expr
    ->  %string
    |   %number

# Optional WhiteSpace
_ -> %WS:*

# Mandatory WhiteSpace
__ -> %WS:+