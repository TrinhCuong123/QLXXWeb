const EnumStatus = {
  OK: '200',
  ERROR: '400',
};

const EnumState = {
  Active: 'Đang hoạt động',
  Locked: 'Đang khóa',
};

const EnumDataType = {
  characterVarying: 'character varying',
  Integer: 'integer',
  Double: 'double precision',
  Date: 'date',
  Text: 'text',
};

const EnumRegex = {
  FILTER_EXPRESSION: /^(?!.*<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>)(?!.*[!@#$%^\=;<>?|\\}{}\[\]]).*$/,
  FILTER_EXPRESSION_SQL: /^(?!.*\b(Select|union|insert|update|delete|drop|exec|alter|create|truncate|--|;|\bselect\b|\balert\b|\bscript\b|\bupdate\b|\bdelete\b|\bexec\b|\bdrop\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bexec\b).*)/,
  FILTER_NUMBER: /^(?!.*[0-9]).*$/,
  FILTER_LINK_URL: /^(?!.*(https:\/\/|http:\/\/)).*$/gm,
  FILTER_EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  FILTER_PHONE_NUMBER: /^(?!00)(?:\+84|84|0)(?:3|5|7|8|9)\d{8}\b/,
  FILTER_SPACE: /^.*\S.*$/,
};

const EnumRegexMessage = {
  FILTER_EXPRESSION_MESSAGE: 'Không nhập kí tự đặc biệt!',
  FILTER_EXPRESSION_SQL_MESSAGE: 'Không nhập kí tự đặc biệt!',
  FILTER_NUMBER_MESSAGE: 'Không được nhập các chữ số!',
  FILTER_LINK_URL_MESSAGE: 'Không nhập link https hoặc http!',
  FILTER_EMAIL_MESSAGE: 'Nhập đúng định dạng email!',
  FILTER_PHONE_NUMBER_MESSAGE: 'Nhập đúng định dạng số điện thoại!',
  FILTER_SPACE_MESSAGE: 'Không được nhập nội dung chỉ chứa khoảng trắng!',
};

export { EnumStatus, EnumState, EnumDataType, EnumRegex, EnumRegexMessage };
