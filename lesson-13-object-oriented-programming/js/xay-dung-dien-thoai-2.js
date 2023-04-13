
    let Mobile=function (battery,composeMemory,inboxMemory,sentMemory,status) {
    this.battery = battery;
    this.composeMemory = composeMemory;
    this.inboxMemory = inboxMemory;
    this.sentMemory = sentMemory;
    this.status = status;
    this.isOn = function () {
    return this.status;
}
    this.turnOn = function () {
    if (!this.isOn()) {
    if (this.battery > 0 && this.battery <= 100) {
    this.useMobileFunc();
    this.status = true;
}
}
}
    this.turnOff = function () {
    if (this.isOn()) {
    if (this.battery > 0 && this.battery <= 100) {
    this.useMobileFunc();
    this.status = false;
}
}
}
    this.chargeBattery = function () {
    if (this.battery < 100) {
        if (this.battery > 95) {
            this.battery++;
        } else this.battery += 5;
}
}
    this.composeMessage = function (message) {
    if (this.isOn()) {
    if (this.battery > 0) {
    this.useMobileFunc();
    this.composeMemory = message;
}
}
}
    this.sendMessage = function (toMobile) {
    if (this.isOn()) {
    if (this.battery > 0) {
    this.useMobileFunc();
    this.sentMemory = this.composeMemory;
    toMobile.inboxMemory = this.sentMemory;
}
}
}
    this.readMessage = function () {
    if (this.isOn()) {
    if (this.battery > 0) {
    this.useMobileFunc();
    return this.inboxMemory;
}
}
}
    this.useMobileFunc = function () {
    this.battery--;
}
    this.getBatteryInfo=function () {
    return this.battery;
}
}
    let Nokia=new Mobile(80,'','','',true);
    let Iphone=new Mobile(40,'','','',true);
    document.getElementById("battery1").innerHTML=`${Iphone.getBatteryInfo()}%`;
    document.getElementById("battery2").innerHTML=`${Nokia.getBatteryInfo()}%`;
    let arrayIphone=new Array();
    let arrayNokia=new Array();
    function chargeBatteryIphone() {
    Iphone.chargeBattery();
    document.getElementById("battery1").innerHTML=`${Iphone.getBatteryInfo()}%`
}
    function chargeBatteryNokia() {
    Nokia.chargeBattery();
    document.getElementById("battery2").innerHTML=`${Nokia.getBatteryInfo()}%`
}
    function composeMessageIphone() {
        if (Iphone.isOn()) {
            Iphone.composeMessage(prompt("Nhắn gì đó cho thằng cục gạch: ", ''));
            Iphone.sendMessage(Nokia);
            arrayNokia.push(Nokia.inboxMemory);
            document.getElementById("numberGetNokia").innerHTML = `${arrayNokia.length}`;
            document.getElementById("numberSendIphone").innerHTML = `${arrayNokia.length}`;
            Iphone.battery++;
            document.getElementById("battery1").innerHTML = `${Iphone.getBatteryInfo()}%`
        }
        // setInterval(composeMessageIphone,1000);
    }
    function composeMessageNokia() {
        if (Nokia.isOn()) {
            Nokia.composeMessage(prompt("Nhắn gì đó cho thằng Táo Xanh: ", ''));
            Nokia.sendMessage(Iphone);
            arrayIphone.push(Iphone.inboxMemory);
            document.getElementById("numberGetIphone").innerHTML = `${arrayIphone.length}`;
            document.getElementById("numberSendNokia").innerHTML = `${arrayIphone.length}`;
            Nokia.battery++;
            document.getElementById("battery2").innerHTML = `${Nokia.getBatteryInfo()}%`
        }
    }
    function sendMessageIphone() {
        if (Iphone.isOn()) {
            if (arrayNokia != '') {
                alert(arrayNokia.join('\n'));
            }
            Iphone.useMobileFunc();
            document.getElementById("battery1").innerHTML = `${Iphone.getBatteryInfo()}%`
        }
    }
    function sendMessageNokia() {
        if (Nokia.isOn()) {
            if (arrayIphone != '') {
                alert(arrayIphone.join('\n'));
            }
            Nokia.useMobileFunc();
            document.getElementById("battery2").innerHTML = `${Nokia.getBatteryInfo()}%`
        }
    }
    function getMessageIphone() {
        if (Iphone.isOn()) {
            if (arrayIphone != '') {
                alert(arrayIphone.join('\n'));
            }
            Iphone.useMobileFunc();
            document.getElementById("battery1").innerHTML = `${Iphone.getBatteryInfo()}%`
        }
    }
    function getMessageNokia() {
        if (Nokia.isOn()) {
            if (arrayNokia != '') {
                alert(arrayNokia.join('\n'));
            }
            Nokia.useMobileFunc();
            document.getElementById("battery2").innerHTML = `${Nokia.getBatteryInfo()}%`
        }
    }
    function turnOffIphone() {
        Iphone.turnOff();
        document.getElementById("battery1").innerHTML=`${Iphone.getBatteryInfo()}%`
        // document.getElementById("onOffIphone").innerHTML=`Off`;
    }
    function turnOnIphone() {
        Iphone.turnOn();
        document.getElementById("battery1").innerHTML=`${Iphone.getBatteryInfo()}%`
        // document.getElementById("onOffIphone").innerHTML=`On`;
    }
    function turnOffNokia() {
        Nokia.turnOff();
        document.getElementById("battery2").innerHTML=`${Nokia.getBatteryInfo()}%`
        // document.getElementById("onOffNokia").innerHTML=`Off`;
    }
    function turnOnNokia() {
        Nokia.turnOn();
        document.getElementById("battery2").innerHTML=`${Nokia.getBatteryInfo()}%`
        // document.getElementById("onOffNokia").innerHTML=`On`;
    }
    function onOffPhone() {
        if (Nokia.status) {
            document.getElementById("onOffNokia").innerHTML = `On`;
        } else document.getElementById("onOffNokia").innerHTML = `Off`;
        // function onOffIphone() {
        if (Iphone.status) {
            document.getElementById("onOffIphone").innerHTML = `On`;
        } else document.getElementById("onOffIphone").innerHTML = `Off`;
        setInterval(onOffPhone,100);
    }
    onOffPhone();
