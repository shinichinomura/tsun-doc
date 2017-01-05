Rails.application.routes.draw do
  root to: 'default#index'

  get '/auth/:provider/callback', to: 'omniauth_callbacks#twitter'

  resources :sessions, only: [:new]
end
