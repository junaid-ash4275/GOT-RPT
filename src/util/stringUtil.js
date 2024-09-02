// StringUtil.js
import LZString from "lz-string";

class StringUtil {
  static decompressString(data) {
    const res = LZString.decompressFromEncodedURIComponent(data);
    return res;
  }
}

export default StringUtil;
