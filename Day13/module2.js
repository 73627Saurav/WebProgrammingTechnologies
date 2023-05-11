arr=[{name:"Rajan",addr:"baner",uname:"raj",passwd:"pass1"}]

exports.adduser=function(ob){
    var pos=arr.findIndex(a=>a.uname===ob.uname);
    //not found, so add the object
    if(pos==-1){
        arr.push(ob);
        console.log(arr);
        return true;
    }
    else{
        return false;
    }

}
exports.validateuser=function(ob){
    console.log(ob)
    var u=arr.find(a=>a.uname===ob.uname);
    if(u!==undefined && u.passwd===ob.pass){
          return u;
    }
    return null;

}