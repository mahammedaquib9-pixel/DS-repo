// Structured experiment data. Sub-experiment content is generated from a shared
// template so each experiment stays compact, then overridden where needed.
const SUBS = [
  { id: "A", title: "Data Collection", aim: "Collect a relevant dataset for the experiment." },
  { id: "B", title: "Data Cleaning", aim: "Handle missing values and remove inconsistencies." },
  { id: "C", title: "Exploratory Data Analysis", aim: "Summarize the dataset and find patterns." },
  { id: "D", title: "Data Visualization", aim: "Visualize key findings with charts." },
  { id: "E", title: "Model Building", aim: "Train an appropriate model or analysis pipeline." },
  { id: "F", title: "Result Analysis", aim: "Evaluate results and document conclusions." },
];

function makeSubs(ctx) {
  return SUBS.map((s, i) => ({
    id: s.id,
    title: s.title,
    aim: `${s.aim} Context: ${ctx}.`,
    procedure: [
      "Import the required libraries.",
      "Load the dataset into a DataFrame.",
      "Inspect the first few rows and column types.",
      "Apply the required transformation or analysis.",
      "Display and verify the result.",
      "Record observations for the viva.",
    ],
    code: `import pandas as pd\n\ndf = pd.read_csv("dataset.csv")\n\nprint(df.head())\nprint(df.describe())`,
    output: "   id  value  category\n0   1   12.5        A\n1   2   13.9        B\n2   3   11.2        A\n\n        value\ncount   3.0\nmean   12.53\n...\n",
  }));
}

const DOC_CODE = {
  "exp-01": {
    A: String.raw`import pandas as pd
import openpyxl

df=pd.read_csv('car_dataset_40x20.csv')
print(df.head())

df.shape

df.columns`,
    B: String.raw`Student_data={
    "Roll_no":[10,11,12,13],
    "name":["Ganesh","mani","nithin","Chandhu"],
    "Dept":["CSE","IT","ECE","CSE"],
}
df=pd.DataFrame(Student_data)
df

df.to_csv("Student_output.txt")
print("Succes")

df

nf=pd.read_csv("Student_output.txt")
nf

df.columns`,
    C: String.raw`Student_data={
    "Roll_no":[10,11,12,13],
    "name":["Ganesh","mani","nithin","Chandhu"],
    "Dept":["CSE","IT","ECE","CSE"],
}
df=pd.DataFrame(Student_data)
df.to_json("Students.json",orient='records',indent=4)
print("JSon file created")

df=pd.read_json('Students.json')
print("Student Data")
df`,
    D: String.raw`Student_data={
    "Roll_no":[10,11,12,13],
    "name":["Ganesh","mani","nithin","Chandhu"],
    "Dept":["CSE","IT","ECE","CSE"],
}
df=pd.DataFrame(Student_data)
df.to_excel("Student.xlsx",sheet_name="Student details",index=False)
print("Data written succesfully in excel")

df=pd.read_excel("Student.xlsx",sheet_name="Student details")
print("Data from excel file")
df`,
  },
  "exp-02": {
    A: String.raw`import requests
import pandas as pd
import sqlite3

url='https://api.github.com/repos/pandas-dev/pandas/issues'
responses=requests.get(url)
issues=responses.json()
df_issues=pd.DataFrame(issues)
print(df_issues[['id','title','state']].head())`,
    B: String.raw`conn=sqlite3.connect("Students.db")
cursor=conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS Students (id INTEGER,name TEXT)")
cursor.execute("INSERT INTO Students VALUES(1,'ganesh')")
conn.commit()
cursor.execute("INSERT INTO Students VALUES(2,'mani')")
conn.commit()
df=pd.read_sql_query("SELECT * FROM Students",conn)
print(df)
cursor.execute("DELETE FROM Students WHERE id=1")
cursor.execute("UPDATE Students SET name ='Alice' where id=1")
conn.commit()
conn.close()`,
  },
  "exp-03": {
    A: String.raw`import numpy as np
import pandas as pd

data={'A':[1,2,np.nan],'B':[4,np.nan,np.nan]}
df=pd.DataFrame(data)
print(df.isna())
df_clean=df.dropna()
df_filled=df.fillna(0)
print()
print(df_clean)
print()
print(df_filled)`,
    B: String.raw`df=pd.DataFrame({'gender':['male','female']})
df['gender_num']=df['gender'].map({'male':1,'female':0})
df_renamed=df.rename(columns={'gender':'Gender'})
print(df_renamed)`,
    C: String.raw`data=pd.DataFrame(np.random.randn(100,3))
outliers=(data>3)|(data<-3)
print(outliers.sum())
data`,
    D: String.raw`import re

txt="this is \t a \n test"
split_txt=re.split(r'\st',txt)
print(split_txt)`,
  },
  "exp-04": {
    A: String.raw`import pandas as pd

index=[['Engineering','Engineering','Science','Science'],['CSE','ECE','Physics','Chemistry']]
multi_index=pd.MultiIndex.from_arrays(index,names=['Department','Branch'])

marks = pd.Series([85, 78, 92, 88],index=multi_index)

print("Original Series:")
print(marks)
print("\nData for Engineering:")
print(marks.loc['Engineering'])
print("\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])
print("\nData for Science:")
print(marks.loc['Science'])`,
    B: String.raw`index2=pd.MultiIndex.from_tuples(
    [('Engineering', 'CSE'),('Engineering', 'ECE'),('Science', 'Physics'),('Science', 'Chemistry')],
    names=['Department', 'Branch']
)

data=pd.DataFrame(
    {'2025': [85, 78, 92, 88],'2026': [90, 82, 95, 91]},
    index=index
)
print("Original Tabular Data:")
print(data)
unstacked_data = data.unstack()
print("\nData after Unstack():")
print(unstacked_data)
stacked_data = unstacked_data.stack()
print("\nData after Stack():")
print(stacked_data)`,
    C: String.raw`df1 = pd.DataFrame({'Name': ['Ravi', 'Sita', 'Arun'],'Marks': [85, None, 78],'Grade': ['A', 'B', None]},
    index=[101, 102, 103])

df2 = pd.DataFrame(
    {'Name': ['Ravi', 'Sita', 'Kiran'],'Marks': [90, 88, 82],'Grade': [None, 'A', 'B']},
    index=[101, 102, 104])

print("First DataFrame:")
print(df1)
print("\nSecond DataFrame:")
print(df2)

merged = pd.merge(df1,df2,left_index=True,right_index=True,how='outer',suffixes=('_DF1', '_DF2'))

print("\nMerged DataFrame:")
print(merged)
combined = df1.combine_first(df2)
print("\nDataFrame after combine_first():")
print(combined)`,
  },
  "exp-05": {
    A: String.raw`import pandas as pd

index=[['Engineering','Engineering','Science','Science'],['CSE','ECE','Physics','Chemistry']]
multi_index=pd.MultiIndex.from_arrays(index,names=['Department','Branch'])

marks = pd.Series([85, 78, 92, 88],index=multi_index)

print("Original Series:")
print(marks)
print("\nData for Engineering:")
print(marks.loc['Engineering'])
print("\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])
print("\nData for Science:")
print(marks.loc['Science'])`,
    B: String.raw`index2=pd.MultiIndex.from_tuples(
    [('Engineering', 'CSE'),('Engineering', 'ECE'),('Science', 'Physics'),('Science', 'Chemistry')],
    names=['Department', 'Branch']
)

data=pd.DataFrame(
    {'2025': [85, 78, 92, 88],'2026': [90, 82, 95, 91]},
    index=index
)
print("Original Tabular Data:")
print(data)
unstacked_data = data.unstack()
print("\nData after Unstack():")
print(unstacked_data)
stacked_data = unstacked_data.stack()
print("\nData after Stack():")
print(stacked_data)`,
  },
};

const DEFS = [
  ["exp-01", "01", "Python Data Analysis", "Python for Data Science", "Beginner", ["Python", "Pandas", "NumPy"], "Learn Python techniques for loading, manipulating, analyzing and visualizing real-world datasets."],
  ["exp-02", "02", "Data Cleaning using Pandas", "Python for Data Science", "Beginner", ["Python", "Pandas"], "Clean messy datasets by handling nulls, duplicates and type issues using Pandas."],
  ["exp-03", "03", "NumPy Array Operations", "Python for Data Science", "Beginner", ["Python", "NumPy"], "Practice vectorized NumPy operations on arrays for fast numeric computing."],
  ["exp-04", "04", "Web Data Collection", "Data Collection and Preprocessing", "Intermediate", ["Python", "Pandas"], "Collect data from the web and structure it for downstream preprocessing tasks."],
  ["exp-05", "05", "Missing Value Imputation", "Data Collection and Preprocessing", "Intermediate", ["Python", "Pandas", "Statistics"], "Apply statistical imputation techniques to handle missing values effectively."],
  ["exp-06", "06", "Feature Encoding and Scaling", "Data Collection and Preprocessing", "Intermediate", ["Python", "Pandas", "Machine Learning"], "Encode categorical features and scale numeric features before modeling."],
  ["exp-07", "07", "Descriptive Statistics", "Exploratory Data Analysis", "Beginner", ["Python", "Pandas", "Statistics"], "Compute descriptive statistics and interpret central tendency and spread."],
  ["exp-08", "08", "Correlation Analysis", "Exploratory Data Analysis", "Intermediate", ["Python", "Pandas", "Statistics"], "Analyze relationships between variables using correlation matrices."],
  ["exp-09", "09", "Outlier Detection", "Exploratory Data Analysis", "Intermediate", ["Python", "Pandas", "Matplotlib"], "Detect outliers using statistical and visual techniques like box plots."],
  ["exp-10", "10", "Matplotlib Chart Gallery", "Data Visualization", "Beginner", ["Python", "Matplotlib"], "Create line, bar, scatter and histogram charts with Matplotlib."],
  ["exp-11", "11", "Seaborn Statistical Plots", "Data Visualization", "Intermediate", ["Python", "Seaborn", "Matplotlib"], "Build beautiful statistical visualizations using Seaborn themes."],
  ["exp-12", "12", "Interactive Plots with Plotly", "Data Visualization", "Intermediate", ["Python", "Plotly"], "Build interactive charts that users can zoom, filter and explore."],
  ["exp-13", "13", "Linear Regression", "Machine Learning", "Intermediate", ["Python", "Scikit-learn", "Machine Learning"], "Fit linear regression models and evaluate predictive performance."],
  ["exp-14", "14", "Classification with Random Forest", "Machine Learning", "Intermediate", ["Python", "Scikit-learn", "Machine Learning"], "Train and evaluate a Random Forest classifier on a real dataset."],
  ["exp-15", "15", "Deep Learning Basics", "Machine Learning", "Advanced", ["Python", "TensorFlow", "Deep Learning"], "Build and train a simple neural network using TensorFlow/Keras."],
];

export const experiments = DEFS.map(([id, number, title, module, difficulty, tools, description]) => ({
  id,
  number,
  title,
  description,
  module,
  difficulty,
  tools,
  overview: {
    summary: `${title} is a hands-on ${difficulty.toLowerCase()} level experiment in the ${module} module. ${description}`,
    architecture: ["Dataset", "Data Collection", "Data Preprocessing", "Data Cleaning", "Exploratory Data Analysis", "Visualization", "Model / Analysis", "Evaluation", "Final Output"],
  },
  subExperiments: makeSubs(title).map((sub) =>
    DOC_CODE[id] && DOC_CODE[id][sub.id] ? { ...sub, code: DOC_CODE[id][sub.id] } : sub,
  ),
}));
