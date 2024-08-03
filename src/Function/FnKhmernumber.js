import { NumericFormat } from "react-number-format";

export function getNumberthousand(num) {
  return (
    <NumericFormat
      value={num}
      thousandSeparator={true}
      displayType={"text"}
      renderText={(value, props) => <div {...props}>{value}</div>}
    />
  );
}


export function getKhmerNumber(number) {
    let numArr = number?.toString()?.split("");
  
    let numberKh = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    let newArr = [];
  
    for (let i = 0; i < numArr?.length; i++) {
      if (isNaN(parseFloat(numArr[i]))) {
        newArr.push(numArr[i]);
        continue;
      }
      newArr.push(numberKh[numArr[i]]);
    }
    return newArr?.join("");
  }
  
  export function getKhmerMonth(month) { 
    let khMonth;
    switch (month) {
      case "1":
        khMonth = "មករា";
        break;
      case "2":
        khMonth = "កុម្ភៈ";
        break;
      case "3":
        khMonth = "មិនា";
        break;
      case "4":
        khMonth = "មេសា";
        break;
      case "5":
        khMonth = "ឧសភា";
        break;
      case "6":
        khMonth = "មិថុនា";
        break;
      case "7":
        khMonth = "កក្កដា";
      case "8":
        khMonth = "សីហា";
        break;
      case "9":
        khMonth = "កញ្ញា";
        break;
      case "10":
        khMonth = "តុលា";
        break;
      case "11":
        khMonth = "វិច្ឆិកា";
        break;
      case "12":
        khMonth = "ធ្នូ";
    }
    return khMonth;
  }
  
  export function getKhmerDay(day) {
    let khDay;
    switch (day) {
      case "Monday":
        khDay = "ចន្ទ";
        break;
      case "Tuesday":
        khDay = "អង្គារ";
        break;
      case "Wednesday":
        khDay = "ពុធ";
        break;
      case "Thursday":
        khDay = "ព្រហស្បតិ៍";
        break;
      case "Friday":
        khDay = "សុក្រ";
        break;
      case "Saturday":
        khDay = "សៅរ៍";
        break;
      case "Sunday":
        khDay = "អាទិត្យ";
    }
    return khDay;
  }
  
  export function calculateNumberOfDay(borrowing_date, first_payment_date) {
    // console.log(borrowing_date, first_payment_date)
    var Difference_In_Time =
      first_payment_date.getTime() - borrowing_date.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
    // console.log(Difference_In_Days)
  
    return Difference_In_Days;
  }
  
  export function getFormattedPhoneNum(input) {
    let output = "";
    input.replace(
      /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
      function (match, g1, g2, g3) {
        if (g1.length) {
          output += g1;
          if (g1.length == 3) {
            output += "";
            if (g2.length) {
              output += " " + g2;
              if (g2.length == 3) {
                output += " ";
                if (g3.length) {
                  output += g3;
                }
              }
            }
          }
        }
      }
    );
    return output;
  }
  export function getGender(input){
    let output = "";
    if(input === "Male"){
      output = "M"
    }else{
      output = "F"
    }

    return output;
  }
  

  
export function getMonthNumber(monthString) {
  let num;
  switch (monthString) {
    case "January":
      num = 1;
      break;
    case "February":
      num = 2;
      break;
    case "March":
      num = 3;
      break;
    case "April":
      num = 4;
      break;
    case "May":
      num = 5;
      break;
    case "June":
      num = 6;
      break;
    case "July":
      num = 7;
      break;
    case "August":
      num = 8;
      break;
    case "September":
      num = 9;
      break;
    case "October":
      num = 10;
      break;
    case "November":
      num = 11;
      break;
    case "December":
      num = 12;
      break;
  }
  return num;
}
