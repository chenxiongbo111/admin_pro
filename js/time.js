function timeFun(){
    function foo(val){
        if(val<10){
            return '0'+val
        }else{
            return val
        }
    }
    var newData =new Date();
    var year =newData.getFullYear();
    var month =newData.getMonth()+1;
    var day =newData.getDate();
    var h =newData.getHours();
    var m =newData.getMinutes();
    var s =newData.getSeconds();
    return foo(year)+'-'+foo(month)+'-'+foo(day)+' '+foo(h)+':'+foo(m)+':'+foo(s)
}