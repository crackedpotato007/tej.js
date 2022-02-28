"use strict";
class Embed {
    constructor() {
        this.title = '';
        this.description = '';
        this.url = '';
        this.color = 0;
        this.timestamp = new Date();
        this.footer = {
            text: '',
            icon_url: ''
        };
        this.image = {
            url: ''
        };
        this.thumbnail = {
            url: ''
        };
        this.author = {
            name: '',
            url: '',
            icon_url: ''
        };
        this.fields = [];
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setFooter(text, icon) {
        this.footer.text = text;
        this.footer.icon_url = icon;
        return this;
    }
    setThumbnail(url) {
        this.thumbnail.url = url;
        return this;
    }
    setImage(url) {
        this.image.url = url;
        return this;
    }
    setAuthor(name, url, icon) {
        this.author.name = name;
        this.author.url = url;
        this.author.icon_url = icon;
        return this;
    }
    addField(name, value, inline = false) {
        this.fields.push({
            name,
            value,
            inline
        });
        return this;
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
        };
    }
}
