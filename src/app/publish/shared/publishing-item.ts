export class PublishingItem {
    public id: string;
    public content: Content;
    public tags: string[];
    public status: string;
    public channels: Channel[];
    public scheduled: string;
    public geo: GeoData;

    public static createEmptyObject() {
        let instance = new PublishingItem();
        instance.content = new Content();
        instance.content.media = new Media();
        instance.geo = new GeoData();
        return instance;
    }
}

class Content {
    public id: string;
    public message: string;
    public network: string;
    public postType: string;
    public media: Media;
}

class Media {
    public fileName: string;
    public url: string;
}

class Channel {
    public name: string;
    id: number;
}

class GeoData {
    public countries: KeyValuePair[];
    public languages: KeyValuePair[];
    public cities: string[];
    public regions: string[];
}

class KeyValuePair {
    public key: string;
    public value: string;
}
