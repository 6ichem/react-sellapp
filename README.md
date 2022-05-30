# React Sellapp

[Sell.app](https://sell.app/) embed integration for React applications.

[![Discord](https://img.shields.io/badge/%3CServer%3E-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)](https://sell.app/discord)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Installation

```shell
npm install react-sellapp
```

or

```shell
yarn add react-sellapp
```

## Usage

```jsx
import SellButton from "react-sellapp";

const App = () => {
  return <SellButton store={3003} product={11453} darkmode={false} />;
};

export default App;
```

## Component props

| Parameter  | Type               | Description                                             |
| :--------- | :----------------- | :------------------------------------------------------ |
| `store`    | `string \| nunber` | **Required**. Your store ID                             |
| `product`  | `string \| numver` | The ID of the product you want to show in the pop-up    |
| `variant`  | `string \| number` | The ID of the variant you want to show in the pop-up    |
| `darkmode` | `boolean`          | Color scheme for the pop-up                             |
| `theme`    | `string`           | HEX color code parameter which styles the CTA button(s) |
| `label`    | `string`           | Label of the button                                     |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
