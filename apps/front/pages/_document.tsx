import { Html, Head, Main, NextScript } from 'next/document'
import { AppProvider } from '../contexts/AppContext'

export default () => <Html>
	<Head />
	<body>
		<AppProvider>
			<Main />
		</AppProvider>
		<NextScript />
	</body>
</Html>
