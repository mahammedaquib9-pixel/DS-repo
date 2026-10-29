import pandas as pd
index = pd.MultiIndex.from_tuples(
    [
        ('Engineering', 'CSE'),
        ('Engineering', 'ECE'),
        ('Science', 'Physics'),
        ('Science', 'Chemistry')
    ],
    names=['Department', 'Branch']
)
data = pd.DataFrame(
    {
        '2025': [85, 78, 92, 88],
        '2026': [90, 82, 95, 91]
    },
    index=index
)
print("Original Tabular Data:")
print(data)
unstacked_data = data.unstack()
print("\nData after Unstack():")
print(unstacked_data)
stacked_data = unstacked_data.stack()
print("\nData after Stack():")
print(stacked_data)