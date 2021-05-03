import {Namespace, Room} from '../models';

let namespaces: Array<Namespace> = [];
let wikiNs = new Namespace(0, 'Wiki','https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png','/wiki');
let mozNs = new Namespace(1, 'Mozilla','https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png','/mozilla');
let linuxNs = new Namespace(2, 'Linux','https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png','/linux');

namespaces.push(wikiNs,mozNs,linuxNs);

wikiNs.addRoom(new Room(0,'New Articles','wiki'));
wikiNs.addRoom(new Room(1,'Editors','wiki'));
wikiNs.addRoom(new Room(2,'Other','wiki'));

mozNs.addRoom(new Room(0,'Firefox','mozilla'));
mozNs.addRoom(new Room(1,'SeaMonkey','mozilla'));
mozNs.addRoom(new Room(2,'SpiderMonkey','mozilla'));
mozNs.addRoom(new Room(3,'Rust','mozilla'));

linuxNs.addRoom(new Room(0,'Debian','linux'));
linuxNs.addRoom(new Room(1,'Red Hat','linux'));
linuxNs.addRoom(new Room(2,'MacOs','linux'));
linuxNs.addRoom(new Room(3,'Kernal Development','linux'));

const transformedNameSpaces = namespaces.map(namespace => {
  return {
    img: namespace.img,
    endpoint: namespace.endpoint
  }
});

export { namespaces, transformedNameSpaces };