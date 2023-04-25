from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path
from finance_app import views
from frontend_app.views import index
from finance_app.views import (
    ExpenseListCreateAPIView,
    CategoryListCreateAPIView,
    BudgetListCreateAPIView,
    SavingsGoalListCreateAPIView,
    BillListCreateAPIView,
    UserLogoutView
)
from finance_app.views import RegisterUser

urlpatterns = [
    path('admin/', admin.site.urls),
    # Views
    path('expenses/', views.ExpenseListView.as_view(), name='expense_list'),
    path('expenses/new/', views.ExpenseCreateView.as_view(), name='expense_create'), 
    path('expenses/<int:pk>/edit/', views.ExpenseUpdateView.as_view(), name='expense_update'),
    path('expenses/<int:pk>/', views.ExpenseDetailView.as_view(), name='expense_detail'),
    path('expenses/<int:pk>/delete/', views.ExpenseDeleteView.as_view(), name='expense_delete'),

    path('category/', views.CategoryListView.as_view(), name='category_list'),
    path('category/new/', views.CategoryCreateView.as_view(), name='category_create'), 
    path('category/<int:pk>/edit/', views.CategoryUpdateView.as_view(), name='category_update'),
    path('category/<int:pk>/', views.CategoryDetailView.as_view(), name='category_detail'),
    path('category/<int:pk>/delete/', views.CategoryDeleteView.as_view(), name='category_delete'),

    path('budget/', views.BudgetListView.as_view(), name='budget_list'),
    path('budget/new/', views.BudgetCreateView.as_view(), name='budget_create'), 
    path('budget/<int:pk>/edit/', views.BudgetUpdateView.as_view(), name='budget_update'),
    path('budget/<int:pk>/', views.BudgetDetailView.as_view(), name='budget_detail'),
    path('budget/<int:pk>/delete/', views.BudgetDeleteView.as_view(), name='budget_delete'),

    path('savings_goal/', views.SavingsGoalListView.as_view(), name='savings_goal_list'),
    path('savings_goal/new/', views.SavingsGoalCreateView.as_view(), name='savings_goal_create'), 
    path('savings_goal/<int:pk>/edit/', views.SavingsGoalUpdateView.as_view(), name='savings_goal_update'),
    path('savings_goal/<int:pk>/', views.SavingsGoalDetailView.as_view(), name='savings_goal_detail'),
    path('savings_goal/<int:pk>/delete/', views.SavingsGoalDeleteView.as_view(), name='savings_goal_delete'),

    path('bill/', views.BillListView.as_view(), name='bill_list'),
    path('bill/new/', views.BillCreateView.as_view(), name='bill_create'), 
    path('bill/<int:pk>/edit/', views.BillUpdateView.as_view(), name='bill_update'),
    path('bill/<int:pk>/', views.BillDetailView.as_view(), name='bill_detail'),
    path('bill/<int:pk>/delete/', views.BillDeleteView.as_view(), name='bill_delete'),

    # API URLs
    path('api/expenses/', ExpenseListCreateAPIView.as_view(), name='api_expense_list_create'),
    path('api/category/', CategoryListCreateAPIView.as_view(), name='api_category_list_create'),
    path('api/budget/', BudgetListCreateAPIView.as_view(), name='api_budget_list_create'),
    path('api/savings_goal/', SavingsGoalListCreateAPIView.as_view(), name='api_savings_goal_list_create'),
    path('api/bill/', BillListCreateAPIView.as_view(), name='api_bill_list_create'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Login 
    path('api/login/', index, name='login'),
    path('api/register/', RegisterUser.as_view(), name='register'),
    path('api/logout/', UserLogoutView.as_view(), name='logout'),

    # Dashboard
    path('dashboard/', views.dashboard, name='dashboard'),
]
