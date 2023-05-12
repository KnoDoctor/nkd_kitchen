import * as React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import LayoutWrapper from "../components/__layouts/_LayoutWrapper";
import MainLayout from "../components/__layouts/MainLayout";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

import { SessionProvider } from "next-auth/react";

export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<style>
					@import url('https://fonts.googleapis.com/css2?family=Arimo&display=swap');
				</style>
			</Head>
			<SessionProvider session={pageProps.session} refetchInterval={0}>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<LayoutWrapper>
						<Component {...pageProps} />
					</LayoutWrapper>
				</ThemeProvider>
			</SessionProvider>
			<Analytics />
		</CacheProvider>
	);
}
