# Exchange Rates API

## 1. Currency List
```
[ENDPOINT] /list-currency
```
```
[GET] https://api-exchange-rates.herokuapp.com/list-currency
```

## 2. Calculator
```
[ENDPOINT] /calculator
```
```
[GET] https://api-exchange-rates.herokuapp.com/calculator?from={currCode}&to={currCode}&amount={amount}
[EXAMPLE] https://api-exchange-rates.herokuapp.com/calculator?from=USD&to=IDR&amount=1000
```

### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| from | code currency from | `no` default USD |
| to | code currency to | `no` default EUR |

