cancelIf(me.function != "admin" && me.function != "sp" , "Invalid user");
if((this.role >= 70 || this.function == "admin") && me.function != "admin"){
    this.role = this.role > 70 ? 65 : this.role;
    this.function = this.function == "admin" ? "sp" : this.function;
}