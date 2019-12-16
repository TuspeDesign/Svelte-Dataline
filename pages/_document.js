import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang="fi">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
