variable "cloudflare_api_token" {
  description = "Token da API da Cloudflare com permissão para gerenciar R2."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "ID da conta Cloudflare."
  type        = string
}

variable "r2_bucket_name" {
  description = "Nome do bucket R2 usado para armazenar relatórios CSV."
  type        = string
  default     = "add-link"
}

variable "r2_location" {
  description = "Localização do bucket R2."
  type        = string
  default     = "ENAM"
}