from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Expense, Category, Budget, SavingsGoal, Bill
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import ExpenseSerializer, CategorySerializer, BudgetSerializer, SavingsGoalSerializer, BillSerializer, RegisterUserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView


#Expenses
class ExpenseListView(ListView):
    model = Expense
    template_name = 'expense_list.html'
    context_object_name = 'expenses'

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class ExpenseDetailView(DetailView):
    model = Expense
    template_name = 'expense_detail.html'

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class ExpenseCreateView(CreateView):
    model = Expense
    template_name = 'expense_form.html'
    fields = ['category', 'amount', 'description', 'date']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class ExpenseUpdateView(UpdateView):
    model = Expense
    template_name = 'expense_form.html'
    fields = ['category', 'amount', 'description', 'date']

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

class ExpenseDeleteView(DeleteView):
    model = Expense
    template_name = 'expense_confirm_delete.html'
    success_url = reverse_lazy('expense_list')

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

#Category
class CategoryListView(ListView):
    
    model = Category
    template_name = 'category_list.html'
    context_object_name = 'categories'

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class CategoryDetailView(DetailView):
    model = Category
    template_name = 'category_detail.html'

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class CategoryCreateView(CreateView):
    model = Category
    template_name = 'category_form.html'
    fields = ['name', 'description']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)    

class CategoryUpdateView(UpdateView):
    model = Category
    template_name = 'category_form.html'
    fields = ['name', 'description']     

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user) 

class CategoryDeleteView(DeleteView):
    model = Category
    template_name = 'category_confirm_delete.html'
    success_url = reverse_lazy('category_list')

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

#Budget
class BudgetListView(ListView):
    model = Budget
    template_name = 'budget_list.html'
    context_object_name = 'budgets'

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

class BudgetDetailView(DetailView):
    model = Budget
    template_name = 'budget_detail.html'

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

class BudgetCreateView(CreateView):
    model = Budget
    template_name = 'budget_form.html'
    fields = ['category', 'amount', 'start_date', 'end_date']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)    

class BudgetUpdateView(UpdateView):
    model = Budget
    template_name = 'budget_form.html'
    fields = ['category', 'amount', 'start_date', 'end_date']

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)      

class BudgetDeleteView(DeleteView):
    model = Budget
    template_name = 'budget_confirm_delete.html'
    success_url = reverse_lazy('budget_list')

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

#Savings Goal
class SavingsGoalListView(ListView):
    model = SavingsGoal
    template_name = 'savings_goal_list.html'
    context_object_name = 'savings_goals'

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

class SavingsGoalDetailView(DetailView):
    model = SavingsGoal
    template_name = 'savings_goal_detail.html'

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

class SavingsGoalCreateView(CreateView):
    model = SavingsGoal
    template_name = 'savings_goal_form.html'
    fields = ['name', 'target', 'current_amount', 'deadline']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class SavingsGoalUpdateView(UpdateView):
    model = SavingsGoal
    template_name = 'savings_goal_form.html'
    fields = ['name', 'target', 'current_amount', 'deadline']

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user) 


class SavingsGoalDeleteView(DeleteView):
    model = SavingsGoal
    template_name = 'savings_goal_confirm_delete.html'
    success_url = reverse_lazy('savings_goal_list')

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

#Bill
class BillListView(ListView):
    model = Bill
    template_name = 'bill_list.html'
    context_object_name = 'bills'

    def get_queryset(self):
        return Bill.objects.filter(user=self.request.user)

class BillDetailView(DetailView):
    model = Bill
    template_name = 'bill_detail.html'

    def get_queryset(self):
        return Bill.objects.filter(user=self.request.user)

class BillCreateView(CreateView):
    model = Bill
    template_name = 'bill_form.html'
    fields = ['name', 'amount', 'due_date', 'frequency']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class BillUpdateView(UpdateView):
    model = Bill
    template_name = 'bill_form.html'
    fields = ['name', 'amount', 'due_date', 'frequency']

    def get_queryset(self):
        return Bill.objects.filter(user=self.request.user)  

class BillDeleteView(DeleteView):
    model = Bill
    template_name = 'bill_confirm_delete.html'
    success_url = reverse_lazy('bill_list')

    def get_queryset(self):
        return Bill.objects.filter(user=self.request.user)

 # API Views

 # Expense
class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Expense.objects.get(pk=pk, user=self.request.user)
        except Expense.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        expense = self.get_object(pk)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)        

 # Category
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk, user=self.request.user)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)      

class CategoryDeleteView(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

 # Budget
class BudgetListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BudgetDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Budget.objects.get(pk=pk, user=self.request.user)
        except Budget.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        budget = self.get_object(pk)
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)         

 # Savings Goal
class SavingsGoalListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = SavingsGoalSerializer

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SavingsGoalDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return SavingsGoal.objects.get(pk=pk, user=self.request.user)
        except SavingsGoal.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        savingsGoal = self.get_object(pk)
        serializer = SavingsGoalSerializer(savingsGoal)
        return Response(serializer.data)              

 # Bill
class BillListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BillSerializer

    def get_queryset(self):
        return Bill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BillDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Bill.objects.get(pk=pk, user=self.request.user)
        except Bill.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        bill = self.get_object(pk)
        serializer = BillSerializer(bill)
        return Response(serializer.data)             

# Register User API
class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def create_default_categories(self, user):
        default_categories = [
            {'name': 'Groceries', 'description': 'Food and household items'},
            {'name': 'Utilities', 'description': 'Electricity, water, gas, and other utilities'},
            {'name': 'Vehicle', 'description': 'Maintainence, insurance and fuel'},
        ]

        for category in default_categories:
            Category.objects.create(user=user, **category)

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "An Account with this username already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "An account with this email address already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        self.create_default_categories(user)
        return Response(
            {"success": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )

 # Log out API
class UserLogoutView(LogoutView):
    next_page = 'login'

# Render Components
@login_required
def dashboard(request):
    return render(request, 'dashboard.html')