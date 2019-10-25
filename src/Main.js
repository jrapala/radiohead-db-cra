import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import useSongPicker from './useSongPicker'
import useAlbumPicker from './useAlbumPicker'
import AlbumInfo from './AlbumInfo'

const GET_ALBUM_BY_ALBUM_ID = gql`
	query($id: ID!) {
		findAlbumById(id: $id) {
			title
			releaseYear
			songs {
				id
				songTitle
			}
		}
	}
`

const GET_ALBUM_BY_SONG_ID = gql`
	query($id: ID!) {
		findSongById(id: $id) {
			recordings {
				album {
					title
					releaseYear
					songs {
						id
						songTitle
					}
				}
			}
		}
	}
`

const Main = () => {
	const [albumResults, setAlbumResults] = useState()
	const resultsRef = useRef()

	useEffect(() => {
		if (resultsRef.current) {
			window.scrollTo({
				behavior: 'smooth',
				top: resultsRef.current.offsetTop,
			})
		}
	}, [albumResults])

	// Create Pickers
	const [song, SongPicker, setSong] = useSongPicker()
	const [album, AlbumPicker, setAlbum] = useAlbumPicker()

	// Handle user album selection
	const { loading: loadingAlbums, error: albumsError } = useQuery(
		GET_ALBUM_BY_ALBUM_ID,
		{
			variables: { id: album },
			skip: !album,
			onCompleted: data => {
				setSong('')
				setAlbumResults([data.findAlbumById])
			},
		}
	)

	// Handle user song selection
	const { loading: loadingSongs, error: songsError } = useQuery(
		GET_ALBUM_BY_SONG_ID,
		{
			variables: { id: song },
			skip: !song,
			onCompleted: data => {
				setAlbum('')
				setAlbumResults(
					data.findSongById.recordings.map(
						recording => recording.album
					)
				)
			},
		}
	)

	const renderContent = () => {
		if (loadingAlbums || loadingSongs) {
			return <div>Loading..</div>
		}

		if (albumsError || songsError) {
			return (
				<div>
					Error connecting to the server. Please try again later.
				</div>
			)
		}

		if (albumResults) {
			if (!album && !song) {
				return
			} else {
				return albumResults.map(album => (
					<AlbumInfo key={album.title} album={album} song={song} />
				))
			}
		}
	}

	return (
		<Fragment>
			<SongPicker />
			<AlbumPicker />
			<div ref={resultsRef}>{renderContent()}</div>
		</Fragment>
	)
}

export default Main
