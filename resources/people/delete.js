cancelIf(me.function != "admin" && me.function != "sp" , "Invalid user");
cancelIf(this.role > me.role, "Invalid permissions");