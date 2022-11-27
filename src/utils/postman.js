import _ from "lodash";

// collection of extensions for postman-collection classes

const PROTOCOL_SEPARATOR = "://";
const FUNCTION = "function";
const PORT_SEPARATOR = ":";
const STRING = "string";
const SEARCH_SEPARATOR = "#";

export function toRawString(postmanURL) {
  var rawUrl = "";
  const protocol = postmanURL.protocol;
  if (protocol) {
    rawUrl += _.endsWith(protocol, PROTOCOL_SEPARATOR)
      ? protocol
      : protocol + PROTOCOL_SEPARATOR;
  }

  if (postmanURL.host) {
    rawUrl += postmanURL.getHost();
  }
  if (typeof _.get(postmanURL.port, "toString") === FUNCTION) {
    rawUrl += PORT_SEPARATOR + postmanURL.port.toString();
  }
  if (postmanURL.path) {
    rawUrl += postmanURL.getPath(true);
  }

  if (typeof postmanURL.hash === STRING) {
    rawUrl += SEARCH_SEPARATOR + postmanURL.hash;
  }
  return rawUrl;
}
