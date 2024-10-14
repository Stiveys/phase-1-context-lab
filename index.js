function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Function to create timeIn event
function createTimeInEvent(employee, dateTime) {
    if (!employee || !dateTime) {
        throw new Error("Invalid employee record or date/time string");
    }

    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to create timeOut event
function createTimeOutEvent(employee, dateTime) {
    if (!employee || !dateTime) {
        throw new Error("Invalid employee record or date/time string");
    }

    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for a specific employee
function calculateAllWages(employee) {
    let eligibleDates = employee.timeInEvents.map(event => event.date);
    let payable = eligibleDates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);
    return payable;
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + calculateAllWages(employee), 0);
}

// Function to find an employee by first name
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}

// Example usage:
let employeesData = [
    ['Thor', 'Odinson', 'God of Thunder', 100],
    ['Steve', 'Rogers', 'Captain America', 90]
];

let employees = createEmployeeRecords(employeesData);

// Adding TimeIn and TimeOut events for each employee
createTimeInEvent(employees[0], '2023-10-12 0900');
createTimeOutEvent(employees[0], '2023-10-12 1700');
createTimeInEvent(employees[1], '2023-10-12 0800');
createTimeOutEvent(employees[1], '2023-10-12 1600');

// Calculating total wages for a specific employee
console.log(calculateAllWages(employees[0]));  // Wages for Thor

// Calculating total payroll for all employees
console.log(calculatePayroll(employees));

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

