function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(employeeData) {
   
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  


  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const wages = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
  }
  
  const employeeTestData = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ];
  
    const employeeRecords = createEmployeeRecords(employeeTestData);
  
  createTimeInEvent(employeeRecords[0], "2019-01-01 0900");
  createTimeOutEvent(employeeRecords[0], "2019-01-01 1100");
  createTimeInEvent(employeeRecords[0], "2019-01-02 0900");
  createTimeOutEvent (employeeRecords[0], "2019-01-02 1100");
  
  createTimeInEvent(employeeRecords[1], "2019-01-01 0900");
  createTimeOutEvent(employeeRecords[1], "2019-01-01 1100");
  createTimeInEvent(employeeRecords[1], "2019-01-02 0900");
  createTimeOutEvent(employeeRecords[1], "2019-01-02 1100");
  
  console.log(calculatePayroll(employeeRecords)); // Output: 770
  