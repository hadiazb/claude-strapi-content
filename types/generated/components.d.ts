import type { Schema, Struct } from '@strapi/strapi';

export interface PageAction extends Struct.ComponentSchema {
  collectionName: 'components_page_actions';
  info: {
    displayName: 'Object';
    icon: 'attachment';
  };
  attributes: {
    characteristics: Schema.Attribute.JSON;
    icon: Schema.Attribute.JSON;
    label: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    parameters: Schema.Attribute.JSON;
    show: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageCharacteristic extends Struct.ComponentSchema {
  collectionName: 'components_page_characteristics';
  info: {
    displayName: 'Characteristic';
    icon: 'code';
  };
  attributes: {};
}

export interface PageCountry extends Struct.ComponentSchema {
  collectionName: 'components_page_countries';
  info: {
    displayName: 'Country';
  };
  attributes: {
    country: Schema.Attribute.Enumeration<
      ['CO', 'PY', 'BO', 'GT', 'PA', 'NI', 'HN', 'SV']
    > &
      Schema.Attribute.Required;
  };
}

export interface PageDataObject extends Struct.ComponentSchema {
  collectionName: 'components_page_data_objects';
  info: {
    displayName: 'DataObject';
    icon: 'code';
  };
  attributes: {
    backend: Schema.Attribute.JSON;
    frontend: Schema.Attribute.JSON;
  };
}

export interface PageFormatting extends Struct.ComponentSchema {
  collectionName: 'components_page_formattings';
  info: {
    displayName: 'Formatting';
    icon: 'code';
  };
  attributes: {};
}

export interface PageIcon extends Struct.ComponentSchema {
  collectionName: 'components_page_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {};
}

export interface PageParameter extends Struct.ComponentSchema {
  collectionName: 'components_page_parameters';
  info: {
    displayName: 'Parameter';
    icon: 'code';
  };
  attributes: {};
}

export interface PageTitle extends Struct.ComponentSchema {
  collectionName: 'components_page_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    show: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page.action': PageAction;
      'page.characteristic': PageCharacteristic;
      'page.country': PageCountry;
      'page.data-object': PageDataObject;
      'page.formatting': PageFormatting;
      'page.icon': PageIcon;
      'page.parameter': PageParameter;
      'page.title': PageTitle;
      'shared.seo': SharedSeo;
    }
  }
}
