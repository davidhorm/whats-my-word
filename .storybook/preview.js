import '../src/App/index.css';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    defaultViewport: 'mobile1',
  }
}

export const decorators = [
  (Story) => (
    <main className="main">
      <Story />
    </main>
  ),
];