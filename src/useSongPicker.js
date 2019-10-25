import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import useDropdown from './useDropdown'

const GET_ALL_SONGS = gql`
	{
		allSongs {
			id
			songTitle
		}
	}
`

const useSongPicker = () => {
	const [songOptions, setSongOptions] = useState([])

	const getAllSongsQuery = useQuery(GET_ALL_SONGS, {
		onCompleted: data => {
			setSongOptions(data.allSongs)
		},
	})

	return useDropdown('Find a Song:', '', songOptions, 'songTitle')
}

export default useSongPicker
