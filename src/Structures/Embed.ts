interface Embed {
	title: string
	description: string
	url: string
	timestamp: Date
	color: number
	footer: {
		text: string
		icon_url: string
	}
	thumbnail: {
		url: string
	}
	image: {
		url: string
	}
	fields: {
		name: string
		value: string
		inline: boolean
	}[]
	author: {
		name: string
		url: string
		icon_url: string
	}
}
class Embed {
	constructor() {
		this.title = ''
		this.description = ''
		this.url = ''
		this.color = 0
		this.timestamp = new Date()
		this.footer = {
			text: '',
			icon_url: ''
		}
		this.image = {
			url: ''
		}
		this.thumbnail = {
			url: ''
		}
		this.author = {
			name: '',
			url: '',
			icon_url: ''
		}
		this.fields = []
	}
	setTitle(title: string) {
		this.title = title
		return this
	}
	setDescription(description: string) {
		this.description = description
		return this
	}
	setURL(url: string) {
		this.url = url
		return this
	}
	setTimestamp(timestamp: Date) {
		this.timestamp = timestamp
		return this
	}
	setColor(color: number) {
		this.color = color
		return this
	}
	setFooter(text: string, icon: string) {
		this.footer.text = text
		this.footer.icon_url = icon
		return this
	}
	setThumbnail(url: string) {
		this.thumbnail.url = url
		return this
	}
	setImage(url: string) {
		this.image.url = url
		return this
	}
	setAuthor(name: string, url: string, icon: string) {
		this.author.name = name
		this.author.url = url
		this.author.icon_url = icon
		return this
	}
	addField(name: string, value: string, inline = false) {
		this.fields.push({
			name,
			value,
			inline
		})
		return this
	}
	toJSON() {
		return {
			title: this.title,
			description: this.description,
			url: this.url,
			timestamp: this.timestamp,
			color: this.color,
			footer: this.footer,
			thumbnail: this.thumbnail,
			image: this.image,
			fields: this.fields,
			author: this.author
		}
	}
}
