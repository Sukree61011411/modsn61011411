from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'frontend/index.html')

def mod_signal(request):
    return render(request,'frontend/modulate.html')

def about(request):
    return render(request,'frontend/about.html')
