## CORS

https://www.npmjs.com/package/cors

to enable cross origin request, when bakend and frontend apps are hosted on different hostnames, or even when PORT names are different, OR when request are http type. we need to enable / whitelist the frontend's hostname from the bakend. this is done by `cors` package in nodeJS


2 types of cors: preflight cors, complex cors

## connecting with mySql database via node

database -> table -> rows
we have to create database via cmd, then provide userID, password of root/any user with capablities to the server while creating the connection. this is done by `mysql` package in nodeJS

## operator ?. is only read only purpose. we should use if else if we need to modify
ex: 
tree?.branch.leaf = 5 
// error: invalid left side expression (if tree is not having branch , as it would become undefined = 5)

so we do: if(tree?.branch.leaf)tree?.branch.leaf=5
