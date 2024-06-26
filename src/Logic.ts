//import { useState } from "react"

function main(Year: number, Main_Info: Array<number>, Assets: Array<number>, DebtList: Array<Array<number>>, CurrentExpenditure: Array<number>, RetirementIncome: number, Retirement_Expenditure: Array<number> ) {//OneOff: Array<number>
  const FinalAge = 90
  let [InitialAge, IdealAge, Income, IncomeG, Legacy] = [Main_Info[0], Main_Info[1], Main_Info[2], Main_Info[3], Main_Info[4]]
  const LifeSpan: number = FinalAge - InitialAge
  let [Cash, Bonds, Stock] = [Assets[0], Assets[1], Assets[2]]
  const Debt: Array<number> = [0, 0] //[Amount, Interest]
  for (let i = 0; i < DebtList.length; i++){
      Debt[1] += DebtList[i][1]
      Debt[0] += DebtList[i][0]
  }
  Debt[1] = Debt[1]/DebtList.length
  let NetWorth = Cash + Bonds + Stock - Debt[0]
  const Ideal: Array<number> = []
  const Projected: Array<number> = []
  for (let i = 0; i < FinalAge; i++){Projected.push(0)}
  const [Monthly_Expenditure, Big_Tickets] = [CurrentExpenditure[0], CurrentExpenditure[1]]
  let YearlyExpenditure = 12*Monthly_Expenditure + Big_Tickets
  
  //var [Incident, Coninuous, Yearly, Start, End] = [OneOff[0], OneOff[1], OneOff[2], OneOff[3], OneOff[4]]
  //do this later
  let RetirementExpenditure: number = 0
  for (const temp of Retirement_Expenditure) {RetirementExpenditure += temp}

  const ISpending = FinalAge - IdealAge
  const IEarning = IdealAge - InitialAge
  let ISum = Legacy
  Ideal.unshift(ISum)
  for (let i = 0; i < ISpending; i++){
      const temp = (RetirementIncome - RetirementExpenditure)*(1.03)*(1/1.02)
      ISum += temp
      Ideal.unshift(ISum)
  }
  const linear_earning = (ISum - NetWorth)/IEarning
  let Debt_Payoff_Years = (Debt[0]/linear_earning)
  if (Debt_Payoff_Years > 0.7*IdealAge){
      Debt_Payoff_Years = 0.7*IdealAge
  }
  const Saving_Years = IEarning - Debt_Payoff_Years
  const k = Math.log(ISum - NetWorth)
  const step = k/Saving_Years
  for (let i = 0; i < IEarning; i++){
      if (i < Debt_Payoff_Years){
          NetWorth += Debt[0]/Debt_Payoff_Years
          Ideal.splice(i, 0, NetWorth)
      }
      else{
          const value = Math.pow(Math.E, (i-Debt_Payoff_Years)*step)
          NetWorth += value
          Ideal.splice(i, 0, NetWorth)
      }

  }


  //Functions
  function TimePass1(){
      Income = Income*IncomeG
      YearlyExpenditure = YearlyExpenditure*1.03
  }
  function TimePass2(){
      Bonds = Bonds*1.02
      Stock = Stock*1.06
      Debt[0] = Debt[0]*Debt[1]
      NetWorth = Bonds + Stock + Cash - Debt[0]
  }
  function Save(amount: number){
      if (Cash >= 6*YearlyExpenditure){
          const Investment = Stock + Bonds + amount
          Bonds += (1-(x/60))*Investment
          Stock += (x/60)*Investment
      }
      else {
          Cash += Math.min(0.5*YearlyExpenditure-amount, amount)
          amount -= Math.min(0.5*YearlyExpenditure-amount, amount)
          if (amount > 0){Save(amount)}
      }
  }
  //Function End
  var [x, y] = [0, LifeSpan]
  Projected[x] = NetWorth
  Projected[y] = Legacy
  let E_Worth = Legacy
  const Y_Worth = NetWorth
  while (y >= x){
      while (E_Worth>Y_Worth){
          x += 1
          TimePass1()
          let Amount = Income - YearlyExpenditure
          if (Debt[0] > 0){
              Debt[0] -= Math.min(Amount, Debt[0])
              Amount -= Math.min(Amount, Debt[0])
              if (Amount > 0){
                  Save(Amount)
              }
          }
          TimePass2()
          //Factor Oneoff
          Projected[x] = NetWorth
      }
      //j
      y -= 1
      const R_Diff = (RetirementIncome - RetirementExpenditure)*(1.03)*(1/1.02)
      E_Worth += R_Diff
      Projected[y] = E_Worth
  }

  const Ans = []
  for (let i = 0; i < LifeSpan; i++){
      Ans.push({year: String(Year+1), ideal: Ideal[i], projected: Projected[i]})
  }
  return Ans
} 

//test
const Year = 2024;
const Main_Info = [50, 65, 100000, 1.05, 200000]; // InitialAge, IdealAge, Income, IncomeG, Legacy
const Assets = [50000, 200000, 300000]; // Cash, Bonds, Stock
const DebtList = [[100000, 1.03]]; // Debt amounts with interest rates
const CurrentExpenditure = [60000, 0]; // Current yearly expenditure
const OneOff = [10000, 5000, 20000, 1, 5]; // One-off expenses: Incident, Continuous, Yearly, Start, End
const RetirementIncome = 70000; // Expected yearly income during retirement
const Retirement_Expenditure = [50000, 55000, 60000]; // Expected yearly expenditure during retirement

const result = main(
  Year,
  Main_Info,
  Assets,
  DebtList,
  CurrentExpenditure,
  RetirementIncome,
  Retirement_Expenditure
);

console.log(result);


/*
  i, j = 0, FinalA //compound debt and investment
projected[i] = Current_Net_worth
projected[j] = Legacy
E_Worth = Legacy
Y_Worth = Current_Net_worth
while j > i: 
while E_worth > Y_Worth:
//i
i+=1
Amount += Income*IncomeGrowth-Expenses*inflation)
if Debt: 
  while Amount > 0:
      key = max(debt.keys)
      if amount > debt[key]: 
          amount -= debt[key]
          debt[key] = 0
      else: 
          debt[key] -= amount
          amount = 0
  if Amount > 0: 
      Savings(Amount)
else: 
  Savings(Amount)
function Savings(amount){
  if cash >= 6*Expenditure: 
      bonds += 0.5*amount
      stocks += 0.5*amount
  else: 
      cash += min(6*Expenditure-amount, amount)
      amount -= min(6*Expenditure-amount, amount)
      if amount > 0: 
      bonds += 0.5*amount
      stocks += 0.5*amount
}
Y_Worth += Amount
projected[i] = Y_Worth
//j
j-=1
Change = Retirement_Income - Retirement_Expenditure
E_Worth += Change*(1/1.02)
projected[j] = E_Worth



}




//Get Monthly_Expenditure, Big_Tickets
OneoffExpenditure = [['Name', One-off Amount, Continuous?, Yearly_Amount, StartAge, EndAge]]
Once = sum(list of once) //Includes continuous one-off portion
Cont = Debt.append(['Name', Yearly_Amount, 0]); if EndAge > I_RA: ISum += Yearly_Amount*(End-Start)/(Ideal-Start)

ideal = [] //doesn't care about investments, or income growth
projected = [0 for i in Range(Life)]


ISpending = FinalA - IdealA//years
IEarning = IdealA - CurrentA //years
ISum = Legacy //Account investment?
for i in Range(ISpending):
inflation *(Retirement_Income - Expenditure_Income)
linear_earning = (Isum - Current_Net_worth)/IEarning
Debt_Payoff_Years = (Amount/linear_Earning)
Saving_Years = IEarning - pay_off_years
for i in Range(Pay off years): 
ideal.append(Current_Net_worth)
for i in Range(IEarning - pay_off_years):
ideal.append(i*step)
//ISum - Current_Net_worth = e^x
x = ln(ISum - Current_Net_worth)
step = (x/Saving_Years)*length(y)
for i in Range(ISpending):
ideal.append(ISum - i*Retirement_Expenditure)


i, j = 0, FinalA //compound debt and investment
projected[i] = Current_Net_worth
projected[j] = Legacy
E_Worth = Legacy
Y_Worth = Current_Net_worth
while j > i: 
while E_worth > Y_Worth:
//i
i+=1
Amount += Income*IncomeGrowth-Expenses*inflation)
if Debt: 
  while Amount > 0:
      key = max(debt.keys)
      if amount > debt[key]: 
          amount -= debt[key]
          debt[key] = 0
      else: 
          debt[key] -= amount
          amount = 0
  if Amount > 0: 
      Savings(Amount)
else: 
  Savings(Amount)
function Savings(amount){
  if cash >= 6*Expenditure: 
      bonds += 0.5*amount
      stocks += 0.5*amount
  else: 
      cash += min(6*Expenditure-amount, amount)
      amount -= min(6*Expenditure-amount, amount)
      if amount > 0: 
      bonds += 0.5*amount
      stocks += 0.5*amount
}
Y_Worth += Amount
projected[i] = Y_Worth
//j
j-=1
Change = Retirement_Income - Retirement_Expenditure
E_Worth += Change*(1/1.02)
projected[j] = E_Worth







//Pay off debt first, emergency sum, bonds and stocks. Bonds and stock division fit to age
//70% Stock, 30% Bond; 50-50, 30-70, 0-100; Change at 35/50/Retirement


*/

