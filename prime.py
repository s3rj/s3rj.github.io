import math
from functools import reduce

#function to check primality
def isprime(x):
  for i in range(2, x-1):
    if x % i == 0:
      return False
    else:
      return True
      
#function to find divisors
def divisors(x):    
    return set(reduce(list.__add__, 
      ([i, x//i] for i in range(1, int(x**0.5) + 1) if x % i == 0)))
      
#function checks if set of numbers satisfies: d+(30/d) is prime for each element
def generatesprime(x):
  n=x
  x=divisors(x)
  x=list(x)
  f=True 
  for d in x:
    if d<= n**.5:
      if not isprime(int((d+(n/d)))):
        f=False
        return f
  return f
#function to sum prime generators less than x 
def sumprimegenerators(x): 
  m=2
  sum= 0
  while m<=x:
    if generatesprime(m):
      sum+=m
    m+=1
    if m%1000==0:
      print(sum,m)
  return sum

#sumprimegenerators(x) is a bit slow, but will eventually find the solution,
#the function could be optimized further by only finding enough divisors to 
#skip a number instead of finding all divisors for each number
