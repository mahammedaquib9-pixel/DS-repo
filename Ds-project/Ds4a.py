import pandas as pd
index = [
   ['Engineering', 'Engineering', 'Science', 'Science'],
   ['CSE', 'ECE', 'Physics', 'Chemistry']
]

multi_index = pd.MultiIndex.from_arrays(
   index,
   names=['Department', 'Branch']
)

marks = pd.Series(
   [85, 78, 92, 88],
   index=multi_index
)
 
print("Original Series:")
print(marks)

print("\nData for Engineering:")
print(marks.loc['Engineering'])

print("\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])

print("\nData for Science:")
print(marks.loc['Science'])