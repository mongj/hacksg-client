import { useState } from "react"

const data = [
    { year: 2017, ideal: 4000, projected: 2400 },
    { year: 2018, ideal: 3000, projected: 1398 },
    { year: 2019, ideal: 2000, projected: 9800 },
    { year: 2020, ideal: 2780, projected: 3908 },
    { year: 2021, ideal: 1890, projected: 4800 },
    { year: 2022, ideal: 2390, projected: 3800 },
    { year: 2023, ideal: 3490, projected: 4300 },
  ];

function main(Year: number, Main_Info: Array<number>, Assets: Array<number>, DebtList: Array<Array<number>>, CurrentExpenditure: number, OneOff: Array<number>, RetirementIncome: number, Retirement_Expenditure: Array<number>) {
    let FinalAge = 90
    var [InitialAge, IdealAge, Income, IncomeG, Legacy] = [Main_Info[0], Main_Info[1], Main_Info[2], Main_Info[3], Main_Info[4]]
    var LifeSpan: number = FinalAge - InitialAge
    var [Cash, Bonds, Stock] = [Assets[0], Assets[1], Assets[2]]
    var Debt: Array<number> = [0, 0] //[Amount, Interest]
    for (let i = 0; i < DebtList.length; i++){
        Debt[1] += DebtList[i][1]
        Debt[0] += DebtList[i][0]
    }
    Debt[1] += Debt[1]/DebtList.length
    var NetWorth = Cash + Bonds + Stock - Debt[0]
    var Ideal: Array<number> = []
    var Projected: Array<number> = []
    for (let i = 0; i < FinalAge; i++){Projected.push(0)}
    var [Monthly_Expenditure, Big_Tickets] = [Assets[0], Assets[1]]
    var YearlyExpenditure = 12*Monthly_Expenditure + Big_Tickets
    
    var [Incident, Coninuous, Yearly, Start, End] = [OneOff[0], OneOff[1], OneOff[2], OneOff[3], OneOff[4]]
    //do this later
    var RetirementExpenditure: number = 0
    for (let temp in Retirement_Expenditure) {RetirementExpenditure += Number(temp)}

    var ISpending = FinalAge - IdealAge
    var IEarning = IdealAge - InitialAge
    var ISum = Legacy
    Ideal.unshift(ISum)
    for (let i = 0; i < ISpending; i++){
        let temp = (RetirementIncome - RetirementExpenditure)*(1.03)*(1/1.02)
        ISum += temp
        Ideal.unshift(ISum)
    }
    var linear_earning = (ISum - NetWorth)/IEarning
    var Debt_Payoff_Years = (Debt[0]/linear_earning)
    var Saving_Years = IEarning - Debt_Payoff_Years
    let k = Math.log(ISum - NetWorth)
    var step = k/Saving_Years
    for (let i = 0; i < IEarning; i++){
        if (i < Debt_Payoff_Years){
            Ideal.splice(i, 0, NetWorth)
        }
        else{
            let value = Math.pow(Math.E, (i-Debt_Payoff_Years)*step)
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
        NetWorth = Bonds + Stock + Cash + Debt[0]
    }
    function Save(amount: number){
        if (Cash >= 6*YearlyExpenditure){
            let Investment = Stock + Bonds + amount
            Bonds += (1-(x/60))*Investment
            Stock += (x/60)*Investment
        }
        else {
            Cash += Math.min(6*YearlyExpenditure-amount, amount)
            amount -= Math.min(6*YearlyExpenditure-amount, amount)
            Save(amount)
        }
    }
    //Function End
    var [x, y] = [0, FinalAge]
    Projected[x] = NetWorth
    Projected[y] = Legacy
    var E_Worth = Legacy
    var Y_Worth = NetWorth
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
        var R_Diff = (RetirementIncome - RetirementExpenditure)*(1.03)*(1/1.02)
        E_Worth += R_Diff
        Projected[y] = E_Worth
    }

    var Ans = []
    for (let i = 0; i < LifeSpan; i++){
        Ans.push({year: String(Year+1), ideal: Ideal[i], projected: Projected[i]})
    }
    return Ans
} 




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

