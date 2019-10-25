import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import useDropdown from './useDropdown'

const GET_ALL_ALBUMS = gql`
	{
		allAlbums {
			id
			title
		}
	}
`

const useAlbumPicker = () => {
	const [albumOptions, setAlbumOptions] = useState([])

	const getAllAlbumsQuery = useQuery(GET_ALL_ALBUMS, {
		onCompleted: data => {
			setAlbumOptions(data.allAlbums)
		},
	})

	return useDropdown('Find an Album:', '', albumOptions, 'title')
}

export default useAlbumPicker
