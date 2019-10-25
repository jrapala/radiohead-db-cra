import React from 'react'

const AlbumInfo = props => (
	<div className="album">
		<div>
			<h3>{props.album.title}</h3>
			<p>{props.album.releaseYear}</p>
		</div>
		<div>
			{props.album.songs.map((song, i) => {
				return (
					<p
						key={song.id}
						className={props.song === song.id ? 'selected' : ''}
					>
						<span>{i + 1}.</span>
						{song.songTitle}
					</p>
				)
			})}
		</div>
	</div>
)

export default AlbumInfo
