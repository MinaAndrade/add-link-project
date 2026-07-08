output "r2_bucket_name" {
  description = "Nome do bucket R2 criado."
  value       = cloudflare_r2_bucket.reports.name
}

output "r2_bucket_location" {
  description = "Localização do bucket R2."
  value       = cloudflare_r2_bucket.reports.location
}