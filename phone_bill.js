export function totalPhoneBill(logs) {
	var logArray = logs.split(", ");
  	var count_sms = 0;
  	var count_calls = 0;
  	for(let i = 0; i < logArray.length; i++) {
    	if(logArray[i] === "call") {
        	count_calls++;
        } else if(logArray[i] === "sms") {
        	count_sms++;
        }
    }
  	var phone_bill = (count_sms * 0.65) + (count_calls * 2.65);
  	return "R" + phone_bill.toFixed(2);
}