import * as pulumi from '@pulumi/pulumi';
import { ComponentData } from '../../util/types';
import { getCloudflareIpRanges, IpRanges } from './cloudflare_ip_range';
import { getCloudflareOriginCaRootCertificate, OriginCaRootCertificate } from './cloudflare_origin_ca_root_certificate';
import { getDefaultDomainSite } from './site_default_domain';

export interface CloudflareData extends ComponentData {
  ipRanges: pulumi.Output<IpRanges>;
  originCaRootCertificate: pulumi.Output<OriginCaRootCertificate>;
}

export const getCloudflare = async (): Promise<CloudflareData> => {
  const cloudFlareIpRanges = await getCloudflareIpRanges();
  const cloudflareOriginCaRootCertificate = await getCloudflareOriginCaRootCertificate();

  return {
    ipRanges: cloudFlareIpRanges.ipRanges,
    originCaRootCertificate: cloudflareOriginCaRootCertificate.originCaRootCertificate,
    resources: [
      getDefaultDomainSite(),
      cloudFlareIpRanges,
      cloudflareOriginCaRootCertificate,
    ],
  };
};
