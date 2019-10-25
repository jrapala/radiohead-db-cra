import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_ALL_SONGS = gql`
	{
		allSongs {
			id
			songTitle
		}
	}
`

const SongPicker = () => {
	const { loading, error, data } = useQuery(GET_ALL_SONGS)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	return (
		<div className="input-row">
			<label htmlFor="song">Find a Song:</label>
			<div>
				<select id="song" defaultValue="">
					<option value=""></option>
					{data.allSongs.map(song => (
						<option key={song.id} value={song.id}>
							{song.songTitle}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default SongPicker
