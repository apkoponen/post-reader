import App from 'next/app';

// Next.js only supports global CSS stylesheets, if they are imported in pages/_app.tsx
// Cf. https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet
import 'normalize.css/normalize.css';
import '../src/styles/global.css';

export default App;
