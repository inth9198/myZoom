const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("connected to server!!")
})

socket.addEventListener("message", (message) => {
    console.log("j g tis",message.data,"from sv");
})

socket.addEventListener("close", () => {
    console.log("disconected");
})

setTimeout(()=>{
    socket.send("hello from th bw");
},1000)