# Homework React

This project is a React application that implements an interactive product manager component which product items can be categorized as either predefined 'fruits' or 'vegetables' in the original task. Each product item can be clicked to move it into its respective type of column, where it will remain for 5 seconds before automatically returning to the main list. Additionally, clicking on an item in the right column will immediately move it back to the bottom of the main list.

### Features

- Clickable buttons for each item in the todo list. ✅
- Products are categorized into separate columns based on their type (Fruit or Vegetable). ✅
- Products automatically return to the main list after N seconds. ✅
- Immediate return of items to the main list when clicked in the right column. ✅

### Test Project Prerequisites

Before you begin, ensure you have the following installed on your machine:

Before you begin, ensure you have the following installed on your machine:

- [Node.js (version 14 or higher)](https://nodejs.org/en)
- [npm (comes with Node.js)](https://www.npmjs.com/)
- [npx (comes with npm)](https://www.npmjs.com/package/npx)

## Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/istvzsig/homework-react.git
cd homework-react
```

2. **Install dependencies**: Use npm to install the required packages

```bash
npm install --save-dev --force
```

3. **Run the development server**: Start the development server using the following command:

```bash
npm run dev
```

### Running Tests

```bash
npx jest
```

or

```bash
npx jest useProducts.test.ts
```

To test useProducts hook only.

## 2. Create data from API (OPTIONAL)

API from [https://dummyjson.com/users](https://dummyjson.com/users)

- Your project must use Typescript, Typescript module, and HTTP framework (GRPC is plus)
- Tranforms JSON data from API to new data groupBy department
- We encourage you to write tests, which we will give you some extra score
- We will give you an extra score if you focus on performance.

### Conclusion

This is a home based test to apply to a job.
