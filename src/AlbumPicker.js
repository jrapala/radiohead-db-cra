import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_ALL_ALBUMS = gql`
	{
		allAlbums {
			id
			title
		}
	}
`

const AlbumPicker = ({ handleAlbumSelection }) => {
	const { loading, error, data } = useQuery(GET_ALL_ALBUMS)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	return (
		<div className="input-row">
			<label htmlFor="album">View an Album:</label>
			<div>
				<select
					id="album"
					defaultValue=""
					onChange={handleAlbumSelection}
				>
					<option value=""></option>
					{data.allAlbums.map(album => (
						<option key={album.id} value={album.id}>
							{album.title}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default AlbumPicker
