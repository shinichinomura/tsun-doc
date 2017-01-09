Rails.application.routes.draw do
  root to: 'default#index'

  get '/auth/:provider/callback', to: 'omniauth_callbacks#twitter'

  resources :sessions, only: [:new]
  
  namespace :amazon do
    resources :items, only: [] do
      collection do
        get :search
      end
    end
  end
end
