export interface RawProfile {
  businessPhones?: string[];
  displayName?: string;
  givenName?: string;
  id?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname?: string;
  userPrincipalName?: string;
}
  
export interface Photo {
  buffer: ArrayBuffer;
  contentType: string;
}
 