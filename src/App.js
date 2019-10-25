import React, { Fragment } from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import Logo from './images/logo.svg'
import Main from './Main'

const client = new ApolloClient({
	uri: "/.netlify/functions/graphql"
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Fragment>
				<img src={Logo} alt="Radiohead Logo" />
				<h2>Album Database</h2>
				<Main />
			</Fragment>
		</ApolloProvider>
	)
}
export default App;
