const { ApolloServer, gql } = require('apollo-server')

const albums = require('../data/albums.json')
const songs = require('../data/songs.json')

const typeDefs = gql`
	type Query {
		allAlbums: [Album!]!
		allSongs: [Song!]!
		findAlbumById(id: ID!): Album!
		findSongById(id: ID!): Song!
	}

	type Album {
		id: ID!
		title: String!
		releaseYear: Int!
		songs: [Song!]!
	}

	type Song {
		id: ID!
		songTitle: String!
		recordings: [Recording!]!
	}

	type Recording {
		id: ID!
		trackTitle: String!
		length: String!
		album: Album!
	}
`

const resolvers = {
	Query: {
		allAlbums: () => albums,
		allSongs: () => songs,
		findAlbumById: (parent, args) => {
			return albums.find(album => args.id === album.id)
		},
		findSongById: (parent, args) => {
			return songs.find(song => args.id === song.id)
		},
	},
	Album: {
		songs: (parent, args) =>
			parent.songs.map(id => songs.find(song => id === song.id)),
	},
	Recording: {
		album: (parent, args) => {
			return albums.find(album => parent.id === album.id)
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => console.log(`Server running at ${url}`))
